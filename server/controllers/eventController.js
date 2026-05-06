const Event = require('../models/Event.js');

// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.ticketPrice) {
            filters.ticketPrice = req.query.ticketPrice;
        }
        const events = await Event.find(filters);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get Event By ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create Event
exports.createEvent = async (req, res) => {
    const { title, description, date, location, category, totalSeats, availableSeats, ticketPrice, imageUrl, createdBy } = req.body;
    try {
        const event = await Event.create({
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats,
            ticketPrice,
            imageUrl,
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update Event
exports.updateEvent = async (req, res) => {
    const { title, description, date, location, category, totalSeats, availableSeats, ticketPrice, imageUrl, createdBy } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats,
            ticketPrice,
            imageUrl,
        }, { new: true });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
