/**
 * Force the download of a file from a URL or import
 * @param {string} url - URL or path of the file to download
 * @param {string} fileName - Name to save the file as
 */
export const downloadFile = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};