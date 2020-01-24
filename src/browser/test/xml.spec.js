/* globals driver, expect */
describe('xml', function() {
    let XML_Element;
    before(() => {
        XML_Element = driver.globals().XML_Element;
    });

    it('should deserialize CDATA element correctly', function() {
        var str = '<test><![CDATA[<dontparse>embedded xml contents</dontparse>]]></test>';
        var xml = new XML_Element();
        xml.parseString(str);
        expect(xml.toString()).toBe(str);
    });

    it('should deserialize (escaped) contents element', function() {
        let contents = '3 is < 4';
        let str = `<test>${XML_Element.prototype.escape(contents)}</test>`;
        let xml = new XML_Element();
        xml.parseString(str);
        expect(xml.toString()).toBe(str);
    });
});
