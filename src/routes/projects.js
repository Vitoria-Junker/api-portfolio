
import express from 'express';
import projectController from '../controllers/projectController.js';
import Project from '../models/project.js';
import { uploadImage } from '../services/uploadImage.js';
import multer from 'multer';
const projectsRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).single('img');

projectsRouter.post('/upload', upload, async (req, res) => {

  if (!req.file || !req.file.buffer) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  const file = req.file;
  try {
    const imageUrl = await uploadImage(file);
    res.send({ url: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao fazer upload');
  }
});

projectsRouter.post('/new', async (req, res) => {
    
    const { name, link, description, img, tecnologies } = req.body;
    const project = new Project( name, link, description, img, tecnologies);
  try {
    await projectController.save(project);
    res.status(201).send('Projeto salvo com sucesso!');
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao salvar projeto');
  }
});

  projectsRouter.get('/', projectController.getAll);


  projectsRouter.get('/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await projectController.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }
      return res.json(project);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar projeto', error });
    }
  });

  projectsRouter.put('/:id/update', projectController.update);
  projectsRouter.delete('/:id/delete', projectController.deleteProject);

export default projectsRouter;


