import TechnologyModel from '../models/technology.js'

export const createTechnology = async (req,res) => {
  try {

    const doc = new TechnologyModel(req.body);

    await doc.save();

    res.json({
        message: "Технология добавлена",
        status: "success"
    })

  }  catch (err) {
      console.log(err);
      res.status(500).json({
          message: 'Не удалось добавить технологии'
      })
  }
};

export const getAllTechnology = async (req,res) => {
    try {

        const technologies = await TechnologyModel.find();

        res.json(technologies)

    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить технологии'
        })
    }
};

export const delTechnology = async (req,res) => {
    try {
        await TechnologyModel.deleteOne({_id: req.params.id});

        res.json({
            message: 'Технология успешно удалёна',
            status: 'success'
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить технологии'
        })
    }
};