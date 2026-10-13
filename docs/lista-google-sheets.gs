/**
 * Lista do emelyncampos.com.br → Google Sheets
 *
 * Cole este código em: planilha "Lista — emelyncampos.com.br" → Extensões → Apps Script.
 * Depois: Implantar → Nova implantação → Tipo "App da Web"
 *   - Executar como: Eu
 *   - Quem pode acessar: Qualquer pessoa
 * Copie a URL que termina em /exec e cole em LISTA_URL no index.html.
 */

var CABECALHO = ['data', 'email', 'interesse', 'pagina', 'origem', 'referrer'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (aba.getLastRow() === 0 || aba.getRange(1, 2).getValue() !== 'email') {
      aba.insertRowBefore(1);
      aba.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO]).setFontWeight('bold');
      aba.setFrozenRows(1);
    }

    var p = (e && e.parameter) || {};
    if (p.website) return resposta({ ok: true }); // campo-isca anti-robô

    var email = String(p.email || '').trim().toLowerCase().slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return resposta({ ok: false });

    aba.appendRow([
      new Date(),
      limpar(email),
      limpar(p.interesse),
      limpar(p.pagina),
      limpar(p.origem),
      limpar(p.referrer)
    ]);
    return resposta({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Evita que alguém injete fórmulas na planilha (=, +, -, @ no começo da célula)
function limpar(v) {
  var s = String(v || '').slice(0, 300);
  return /^[=+-@]/.test(s) ? "'" + s : s;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
