import { useEffect, useState } from "react";
import Editor from "./Editor";
function App() {
  const [html, setHtml] = useState(localStorage.getItem("webcode-html") || "");
  const [css, setCss] = useState(localStorage.getItem("webcode-css") || "");
  const [javascript, setJavascript] = useState(
    localStorage.getItem("webcode-javascript") || ""
  );
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>`);
    }, 250);

    localStorage.setItem("webcode-html", html);
    localStorage.setItem("webcode-javascript", javascript);
    localStorage.setItem("webcode-css", css);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <>
      <div className="pane top__pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
