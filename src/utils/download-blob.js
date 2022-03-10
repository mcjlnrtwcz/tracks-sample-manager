export default function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener("click", clickHandler);
        });
    };

    a.addEventListener("click", clickHandler, false);
    a.click();
}
