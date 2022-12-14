function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'validationError') {
        return Object.values(err.errors).map(e = ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Resquest error' }]
    }
}