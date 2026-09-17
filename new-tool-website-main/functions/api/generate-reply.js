// Cloudflare Pages Function — Groq AI proxy for GST Notice Reply Generator
// Deployed automatically at: /api/generate-reply
// API key is stored as a Cloudflare environment variable: GROQ_API_KEY

// Simple in-memory rate limiter (per-isolate, resets on cold start)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per IP per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}

// CORS headers for the response
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Check API key is configured
  const apiKey = env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'AI service not configured. Please contact the site administrator.' }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute before generating another reply.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request format.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const {
    noticeType = 'ASMT-10',
    noticeRef = 'GST/REF/2026',
    noticeDate = '2026-08-01',
    din = 'N/A',
    financialYear = 'FY 2023-24',
    demandAmount = '',
    jurisdiction = 'GST Ward / Range / Division',
    discrepancyType = 'itc-2b-3b',
    taxpayerName = 'Taxpayer',
    taxpayerGstin = 'GSTIN',
    documents = [],
    customContext = '',
  } = body;

  // Build the system prompt — domain-expert GST legal drafter
  const systemPrompt = `You are an expert Indian GST legal reply drafter — a senior tax consultant with 15+ years of experience in indirect tax litigation, CBIC circulars, and GST tribunal proceedings.

Your task is to draft a professional, legally sound written submission (reply) to a GST notice. The reply must:

1. Follow the standard legal reply format used in Indian GST proceedings
2. Begin with "BEFORE THE SUPERINTENDENT / PROPER OFFICER / ASSISTANT COMMISSIONER..." header, mentioning the specific jurisdiction
3. Include proper party descriptions (Noticee vs Department)
4. Clearly state the Financial Year / Tax Period, Disputed Demand Amount (if provided), and Notice Reference
5. Contain numbered paragraphs with PRELIMINARY SUBMISSIONS, SUBMISSIONS ON MERITS, ABSENCE OF MENS REA, and PRAYER sections
6. Cite specific CGST Act sections, Rules, CBIC Circulars, and relevant High Court / Supreme Court judgments
7. If DIN is missing or N/A, raise a preliminary objection under CBIC Circular No. 122/41/2019-GST and 128/47/2019-GST (notices without DIN are invalid and deemed non-est)
8. For delayed ITC disputes up to FY 2020-21, cite the retrospective relief enacted under Section 16(5) & 16(6) of the CGST Act (Finance (No. 2) Act, 2024)
9. For Section 73 notices for FY 2017-18 to 2019-20, cite eligibility under Section 128A Amnesty Scheme (Rule 164 & Circular 238/32/2024-GST)
10. Include a mandatory prayer for personal hearing under Section 75(4) of the CGST Act
11. End with a VERIFICATION clause and signature block
12. Use formal legal language appropriate for Indian quasi-judicial proceedings
13. Be factually accurate regarding GST law provisions — do NOT invent fake section numbers or circular numbers
14. Include a LIST OF ENCLOSURES section based on the documents the taxpayer has

Key legal references to consider:
- Section 16(2) conditions for ITC eligibility
- Section 16(5) & 16(6) retrospective relaxation for delayed ITC up to FY 2020-21
- Section 73 (non-fraud demands, 3-year limitation) vs Section 74 (fraud/suppression, 5-year limitation)
- Section 74A (unified determination of tax for FY 2024-25 onwards, 42-month SCN limitation, enacted via Finance (No. 2) Act, 2024)
- Section 75(4) mandatory personal hearing before adverse order
- Section 50 interest on delayed payment (proviso on net cash liability only)
- Section 128A statutory waiver of interest & penalty for Section 73 cases pertaining to FY 2017-18 to 2019-20 (conditional on tax payment by notified deadline)
- Rule 88C (DRC-01B turnover mismatch) and Rule 88D (DRC-01C ITC mismatch)
- Rule 37 (180-day payment reversal)
- CBIC Circular 183/15/2022-GST, Circular 193/05/2023-GST, Circular 170/02/2022-GST, Circular 122/41/2019-GST

IMPORTANT: Generate ONLY the legal reply text. No markdown formatting. No conversational explanations before or after. Just the complete formal legal reply document.`;

  // Build the user prompt with all notice details
  const docsDescription = documents.length > 0
    ? `Documents the taxpayer will attach: ${documents.join(', ')}`
    : 'No supporting documents specified.';

  const demandText = demandAmount ? `Disputed Demand Amount: INR ${demandAmount}` : 'Disputed Demand Amount: As proposed in the notice';

  const userPrompt = `Draft a complete legal reply to the following GST notice:

Notice Type: ${noticeType}
Notice Reference Number: ${noticeRef}
Notice Date: ${noticeDate}
DIN (Document Identification Number): ${din}
Financial Year / Tax Period: ${financialYear}
Jurisdiction / Office: ${jurisdiction}
${demandText}
Alleged Discrepancy: ${discrepancyType}
Taxpayer Legal Name: ${taxpayerName}
Taxpayer GSTIN: ${taxpayerGstin}
${docsDescription}

${customContext ? `Additional context from taxpayer:\n${customContext}` : ''}

Generate the complete written submission / reply in proper legal format.`;

  try {
    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 4096,
        stream: false,
      }),
    });

    if (!groqResponse.ok) {
      const errBody = await groqResponse.text();
      console.error('Groq API error:', groqResponse.status, errBody);

      if (groqResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI service is temporarily busy. Please try again in a few seconds, or use the Quick Template option.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'AI generation failed. Please use the Quick Template option instead.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || '';

    if (!reply) {
      return new Response(
        JSON.stringify({ error: 'AI returned an empty response. Please try again.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        reply,
        model: data.model,
        usage: data.usage,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Groq proxy error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to connect to AI service. Please use the Quick Template option.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
