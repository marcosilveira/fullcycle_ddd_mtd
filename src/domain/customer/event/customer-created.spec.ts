import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/send-console-log1.handle";
import SendConsoleLog2Handler from "./handler/send-console-log2.handle";

describe("Customer events tests", () => {

    it("should test customer created event handler SendConsoleLog1Handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should test customer created event handler SendConsoleLog2Handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should test customer created event handler notify SendConsoleLog1Handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer created",
            description: "Customer 1 was created",
        })
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    })

    it("should test customer created event handler notify SendConsoleLog2Handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer created",
            description: "Customer 1 was created",
        })
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    })


});