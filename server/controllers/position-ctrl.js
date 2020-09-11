const Position = require('../models/position-model');

createPosition = (req, res) => {
    const { body } = req;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You most provide a position',
        });
    }

    const position = new Position(body);

    if (!position) {
        return res.status(400).json({ success: false, error: err });
    }

    position
        .save()
        .then(() => {
            console.log('adding position');
            return res.status(201).json({
                success: true,
                id: position._id,
                message: 'Position added',
            });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, message: 'Position not added' });
        });
};

updatePosition = async (req, res) => {
    const { body } = req;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You most provide a position to update',
        });
    }

    console.log(body);
};

deletePositionById = async (req, res) => {
    await Position.findOneAndDelete({ _id: req.params.id }),
        (err, position) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err,
                });
            }

            if (!position) {
                return res.status(404).json({
                    success: false,
                    error: 'Position not found',
                });
            }

            return res.status(200).json({ success: true, data: position });
        };
};

getAllPositions = async (req, res) => {
    await Position.find({}, (err, positions) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
        return res.status(200).json({
            success: true,
            data: positions,
        });
    }).catch((err) => console.log(err));
};

module.exports = { createPosition, updatePosition, deletePositionById, getAllPositions };
