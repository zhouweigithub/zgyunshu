// key,长度必须为8的倍数
// {"words":[825373492,892745528],"sigBytes":8}
let e = t.enc.Utf8.parse("bGcGfWb3Kg2s4gcG");
// iv
// {"words":[1785949029,2036281654,825767986,859255090],"sigBytes":16}
let n = t.enc.Utf8.parse("aebksHkG4jAEk2Ag");

// console.log(JSON.stringify(e))
// console.log(JSON.stringify(n))


function MyEncrypt(data) {
    let o = t.enc.Utf8.parse(data);
    let a = t.AES.encrypt(o, e, {
        iv: n,
        mode: t.mode.CBC,
        padding: t.pad.Pkcs7
    })
    return a.ciphertext.toString().toUpperCase();
}

function MyDecrypt(data) {
    let o = t.enc.Hex.parse(data);
    let i = t.enc.Base64.stringify(o);
    return t.AES.decrypt(i, e, {
        iv: n,
        mode: t.mode.CBC,
        padding: t.pad.Pkcs7
    }).toString(t.enc.Utf8).toString();
}
