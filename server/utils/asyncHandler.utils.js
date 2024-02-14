const asyncHandler = (fn) => (req, res, next) => {
    try {
        return fn(req, res, next).catch(next);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = asyncHandler;