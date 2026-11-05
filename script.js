function convertMarkdown() {
    const input = document.getElementById("markdown-input").value;

    let html = input;

    // Convert images
    html = html.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img alt="$1" src="$2">'
    );

    // Convert links
    html = html.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2">$1</a>'
    );

    // Convert headings
    html = html.replace(
        /^\s*### (.+)$/gm,
        '<h3>$1</h3>'
    );

    html = html.replace(
        /^\s*## (.+)$/gm,
        '<h2>$1</h2>'
    );

    html = html.replace(
        /^\s*# (.+)$/gm,
        '<h1>$1</h1>'
    );

    // Convert blockquotes
    html = html.replace(
        /^\s*> (.+)$/gm,
        '<blockquote>$1</blockquote>'
    );

    // Convert bold text (**text** or __text__)
    html = html.replace(
        /\*\*(.+?)\*\*|__(.+?)__/g,
        function(match, a, b) {
            return `<strong>${a || b}</strong>`;
        }
    );

    // Convert italic text (*text* or _text_)
    html = html.replace(
        /\*(.+?)\*|_(.+?)_/g,
        function(match, a, b) {
            return `<em>${a || b}</em>`;
        }
    );

    return html;
}


// Get HTML elements
const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");


// Listen for input changes
markdownInput.addEventListener("input", function() {

    const convertedHTML = convertMarkdown();

    // Display raw HTML
    htmlOutput.textContent = convertedHTML;

    // Render HTML preview
    preview.innerHTML = convertedHTML;

});
