
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import SendConsoleLogHandler from "./handler/send-console-log.handle";

describe("Customer change address events tests", () => {

    it("should test customer change address event handler was created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
    })

    it("should test customer change address call event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: "123",
            name: "Address 1",
            to: "Address 2"

        })
        eventDispatcher.notify(customerChangeAddressEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    })    

});