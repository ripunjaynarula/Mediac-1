import express from 'express'
import consultations from '../models/consultation';
import patients from '../models/patients';
import { uid } from 'rand-token';

const router = express.Router();

router.post('/', async (req:any, res: any) => {
    const patient = await patients.findOne({email: req.body.email});
    if(!patient){
        return res.send({success: false, message: "Invalid Attempt."})
    }
    let id = '';
    while (true){
        id = uid(10);
        const d = await consultations.findOne({uid: id});
        if (!d){
            break
        }
    }

    let consultation = new consultations({
        patientEmail: req.body.email,
        startDate: Date.now(),
        description: req.body.question,
        age: req.body.age,
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        medication: req.body.medication,
        allergies: req.body.allergies,
        previousCondition: req.body.previousCondition,
        uid: id
    });

    try{
        consultation = await consultation.save();
        //send notification
        return res.send({success: true});
    } catch (e) {
        res.send({success: false, message: 'Internal Error.'});
        return;
    }

});

export default router;