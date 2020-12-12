// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
let widget = await createWidget();
Script.setWidget(widget);
widget.presentMedium();
Script.complete();

async function createWidget() {
    const dataUrl = "https://makma.github.io/scriptable-stocks/result.json";

    console.log(await new Request(dataUrl).loadJSON());
    const data = await new Request(dataUrl).loadJSON();

    const widget = new ListWidget();
    let titleRow = widget.addText(`Today losers`);
    titleRow.font = Font.boldSystemFont(15);
    titleRow.textColor = Color.white();
    widget.addSpacer(5);

    for (i = 0; i < 6; i++) {
        const looser = data.loosers[i];
        let row = widget.addText(`${looser.ticker} ${looser.name} ${looser.change}`);
        row.font = Font.semiboldSystemFont(14);
    }

    let gradient = new LinearGradient()
    
    gradient.colors = [new Color("3a8cc1"), new Color("00A9D6")];
    gradient.locations =  [0, 1];
    
    widget.backgroundGradient = gradient
    widget.setPadding(1, 10, 1, 1)
    return widget;
}
