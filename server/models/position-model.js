const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sensible defaults
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Position = new Schema(
    {
        base: { type: String, required: true },
        target: { type: String, required: true },
        exchange: { type: String, required: true },
        direction: { type: String, required: true },
        size: { type: Number, required: true },
        entry: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('positions', Position);
