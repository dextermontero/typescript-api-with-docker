import { NextFunction, Request, Response } from 'express';
import { Connect, Query } from '../configs/mysql';
import logging from '../configs/loggings';

const NAMESPACE = "Contacts";

const getAllData = (req: Request, res: Response, next: NextFunction) => {
    let query = "SELECT * FROM contact_list";

    Connect().then(connection => {
        Query(connection, query).then(result => {
            return res.status(200).json({
                result
            })
        }).catch(error => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            })
        }).finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const getId = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;

    let query = `SELECT * FROM contact_list WHERE id = "${id}"`;

    Connect().then((connection) => {
        Query(connection, query).then((result) => {
            logging.info(NAMESPACE, 'Get Data by Id: ', result);
            return res.status(200).json({
                result
            });
        }).catch((error) => {
            logging.error(NAMESPACE, error.message, error);
    
            return res.status(200).json({
                message: error.message,
                error
            });
        }).finally(() => {
            connection.end();
        });
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    });
};

const createData = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, address, phone } = req.body;
    const nameReg = /[A-Za-z ]/;
    const emailReg = /^[a-zA-Z0-9._]+@(gmail|yahoo|myyahoo|outlook|hotmail)+.[a-z-A-z]{2,}$/;
    const phoneReg = /^[0-9]{11}$/;
    let validationError = false;

    if(!name && !email && !address && !phone){
        validationError = true;
        return res.status(200).json({
            name: "Name is required",
            email: "Email address is required",
            address: "Address is required",
            phone: "Phone is required",
        });
    }

    if (!nameReg.test(name)) {
        validationError = true;
        return res.status(200).json({
            name: "This name contains letters only",
        });
    }

    if (!emailReg.test(email)) {
        validationError = true;
        return res.status(200).json({
            email: "This email address must be contains with @gmail, @yahoo, @myyahoo, @outlook, @hotmail",
        });
    }

    if (!phoneReg.test(phone)) {
        validationError = true;
        return res.status(200).json({
            phone: "This phone number must be number with maximum 11 digits",
        });
    }

    if(!name){
        validationError = true;
        return res.status(200).json({
            name: "Name is required",
        });
    }

    if(!email){
        validationError = true;
        return res.status(200).json({
            email: "Email address is required",
        });
    }

    if(!address){
        validationError = true;
        return res.status(200).json({
            address: "Address is required",
        });
    }

    if(!phone){
        validationError = true;
        return res.status(200).json({
            phone: "Phone Number is required",
        });
    }

    if (!validationError) {
        let query = `INSERT INTO contact_list (name, email, address, phone) VALUES ("${name}", "${email}", "${address}", "${phone}")`;

        Connect().then((connection) => {
            Query(connection, query).then((result) => {
                logging.info(NAMESPACE, 'Created data: ', result);
                return res.status(200).json({
                    message: "Created data successfully",
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);

                return res.status(200).json({
                    message: error.message,
                    error
                });
            })
            .finally(() => {
                logging.info(NAMESPACE, 'Closing connection.');
                connection.end();
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(200).json({
                message: error.message,
                error
            });
        });
    }
};

const updateData = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, address, phone} = req.body;
    const nameReg = /[A-Za-z ]/;
    const emailReg = /^[a-zA-Z0-9._]+@(gmail|yahoo|myyahoo|outlook|hotmail)+.[a-z-A-z]{2,}$/;
    const phoneReg = /^[0-9]{11}$/;
    let validationError = false;

    if(!name && !email && !address && !phone){
        validationError = true;
        return res.status(200).json({
            name: "Name is required",
            email: "Email address is required",
            address: "Address is required",
            phone: "Phone is required",
        });
    }

    if (!nameReg.test(name)) {
        validationError = true;
        return res.status(200).json({
            name: "This name contains letters only",
        });
    }

    if (!emailReg.test(email)) {
        validationError = true;
        return res.status(200).json({
            email: "This email address must be contains with @gmail, @yahoo, @myyahoo, @outlook, @hotmail",
        });
    }

    if (!phoneReg.test(phone)) {
        validationError = true;
        return res.status(200).json({
            phone: "This phone number must be number with maximum 11 digits",
        });
    }

    if(!name){
        validationError = true;
        return res.status(200).json({
            name: "Name is required",
        });
    }

    if(!email){
        validationError = true;
        return res.status(200).json({
            email: "Email address is required",
        });
    }

    if(!address){
        validationError = true;
        return res.status(200).json({
            address: "Address is required",
        });
    }

    if(!phone){
        validationError = true;
        return res.status(200).json({
            phone: "Phone Number is required",
        });
    }

    if (!validationError) {
        let id = req.params.id;
        let query = `UPDATE contact_list SET name="${name}", email="${email}", address="${address}", phone="${phone}" WHERE id = "${id}"`;

        Connect().then((connection) => {
            Query(connection, query).then((result) => {
                logging.info(NAMESPACE, 'Updated Successfully: ', result);
                return res.status(200).json({
                    message: "Updated data successfully",
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);

                return res.status(200).json({
                    message: error.message,
                    error
                });
            })
            .finally(() => {
                logging.info(NAMESPACE, 'Closing connection.');
                connection.end();
            });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
    }
}

const deleteDataById = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;

    let query = `DELETE FROM contact_list WHERE id = "${id}"`;
    Connect().then((connection) => {
        Query(connection, query).then((result) => {
            logging.info(NAMESPACE, 'Deleted data by Id: ', result);
            return res.status(200).json({
                message: "Deleted data successfully"
            });
        }).catch((error) => {
            logging.error(NAMESPACE, error.message, error);
    
            return res.status(200).json({
                message: error.message,
                error
            });
        }).finally(() => {
            connection.end();
        });
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        });
    });    
};

export default { getAllData, getId, createData, updateData, deleteDataById};