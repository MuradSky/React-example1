export class GeneratePDF {
    base64ToArrayBuffer(base64: string) {
        const binaryString = window.btoa(base64)
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        console.log(bytes)
        return bytes;
    }

    saveByteArray(reportName: string, response: any) {
        var bytes = new Uint8Array(response);
        window.open("data:application/pdf," + encodeURI(response)); 
        console.log(bytes)
        var blob = new Blob([bytes], {type: "application/pdf"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "myFileName.pdf";
        // link.click();
    };
} 