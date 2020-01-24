/* globals driver, */
describe('variables', function() {
    before(() => driver.reset());

    it('should be able to undo add global variable (after serializing)', function() {
        const {SnapActions, SnapUndo} = driver.globals();
        return SnapActions.addVariable('testVar', true)
            .then(() => {
                // Get the serialized event and try to apply it
                var serializer = driver.ide().serializer;
                var str = '<replay>' + serializer.replayHistory() + '</replay>';
                var xml = serializer.parse(str);

                // serialize/deserialize the event
                SnapUndo.reset();
                const allEvents = serializer.loadReplayHistory(xml);

                // undo the last event
                const event = SnapUndo.getInverseEvent(allEvents.pop());
                return SnapActions.applyEvent(event);
            });
    });
});
