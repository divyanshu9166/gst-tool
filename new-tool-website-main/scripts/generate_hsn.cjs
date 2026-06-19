const fs = require('fs');
const path = require('path');

const hsnPkgPath = path.resolve('C:/Users/divya/.gemini/antigravity-ide/brain/cabc1216-6dca-43fc-b7f7-fb1ca1d4846b/scratch/node_modules/hsn-code-package');
const pkg = require(hsnPkgPath);

const allHsn = pkg.getAllHsn();
const allSac = pkg.getAllSac();

function getCategory(chapterNum) {
    if (chapterNum >= 1 && chapterNum <= 5) return 'Live Animals; Animal Products';
    if (chapterNum >= 6 && chapterNum <= 14) return 'Vegetable Products';
    if (chapterNum === 15) return 'Animal or Vegetable Fats and Oils';
    if (chapterNum >= 16 && chapterNum <= 24) return 'Prepared Foodstuffs; Beverages; Tobacco';
    if (chapterNum >= 25 && chapterNum <= 27) return 'Mineral Products';
    if (chapterNum >= 28 && chapterNum <= 38) return 'Chemical Industries';
    if (chapterNum >= 39 && chapterNum <= 40) return 'Plastics and Rubber';
    if (chapterNum >= 41 && chapterNum <= 43) return 'Hides, Skins, and Leather';
    if (chapterNum >= 44 && chapterNum <= 46) return 'Wood and Wood Products';
    if (chapterNum >= 47 && chapterNum <= 49) return 'Paper and Paperboard';
    if (chapterNum >= 50 && chapterNum <= 63) return 'Textiles and Textile Articles';
    if (chapterNum >= 64 && chapterNum <= 67) return 'Footwear and Headgear';
    if (chapterNum >= 68 && chapterNum <= 70) return 'Stone, Plaster, Cement, Ceramic, Glass';
    if (chapterNum === 71) return 'Precious Metals and Stones';
    if (chapterNum >= 72 && chapterNum <= 83) return 'Base Metals and Articles';
    if (chapterNum >= 84 && chapterNum <= 85) return 'Machinery and Electrical Equipment';
    if (chapterNum >= 86 && chapterNum <= 89) return 'Vehicles and Transport Equipment';
    if (chapterNum >= 90 && chapterNum <= 92) return 'Optical, Medical, Musical Instruments';
    if (chapterNum === 93) return 'Arms and Ammunition';
    if (chapterNum >= 94 && chapterNum <= 96) return 'Miscellaneous Manufactured Articles';
    if (chapterNum >= 97 && chapterNum <= 98) return 'Works of Art and Antiques';
    if (chapterNum === 99) return 'Services (SAC)';
    return 'Other';
}

const finalData = [];

// Process HSN Codes
allHsn.forEach(item => {
    let codeStr = item.code.toString();
    if (codeStr.length % 2 !== 0) {
        codeStr = '0' + codeStr;
    }
    
    const chapterStr = codeStr.substring(0, 2);
    const chapterNum = parseInt(chapterStr, 10);
    const category = getCategory(chapterNum);
    
    // Get GST Rate
    const rateObj = pkg.getGstRateByCode(item.code);
    const gstRate = rateObj ? rateObj.igstRate : 18; // Default 18 if somehow missing
    
    finalData.push({
        c: codeStr,
        d: item.description,
        t: 'HSN',
        cat: category,
        ch: chapterNum,
        r: gstRate
    });
});

// Process SAC Codes
allSac.forEach(item => {
    let codeStr = item.code.toString();
    
    // For SAC codes, we might not have a direct rate function in this package in the same way,
    // but SAC is usually 18%. Let's see if getGstRateByCode works.
    const rateObj = pkg.getGstRateByCode(item.code);
    const gstRate = rateObj ? rateObj.igstRate : 18;
    
    finalData.push({
        c: codeStr,
        d: item.description,
        t: 'SAC',
        cat: 'Services (SAC)',
        ch: 99,
        r: gstRate
    });
});

const outputDir = path.resolve(__dirname, '../public/data');
fs.writeFileSync(path.join(outputDir, 'hsn_full.json'), JSON.stringify(finalData));

console.log(`Successfully generated hsn_full.json with ${finalData.length} records including GST Rates.`);
