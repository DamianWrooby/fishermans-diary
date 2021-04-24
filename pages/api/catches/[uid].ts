import type { NextApiRequest, NextApiResponse } from 'next';
import { CatchTypes } from '../../../components/catches/CatchList';
import firebase from '../../../services/firebaseAdmin';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;
  let data = [];

  return new Promise<void>((resolve, reject) => {
    firebase
      .collection('catches')
      .where('author_uid', '==', uid)
      .orderBy('timestamp')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({
            species: doc.data().species,
            length: doc.data().length,
            weight: doc.data().weight,
            method: doc.data().method,
            bait: doc.data().bait,
            date: doc.data().date,
            time: doc.data().time,
          });
        });
        res.statusCode = 200;
        res.end(JSON.stringify(data));
        resolve();
      })
      .catch((err) => {
        res.json(err);
        res.status(405).end();
        return resolve();
      });
  });
};
