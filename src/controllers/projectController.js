
  import { getDatabase, ref, set, push, get, remove} from 'firebase/database';
  import projectSchema from '../validation/projectsValidation.js';
  import Project from '../models/project.js';

 const save = async (project) => {
    try {
      //chamar uma funçao que faz o upload da imagem para o storage do firebase e retorna a url 
      await projectSchema.validate(project);
      const database = getDatabase();
      const projectsRef = ref(database, 'projects');
      const newProjectRef = await push(projectsRef, project);
      return newProjectRef.key;
    } catch (error) {
      throw error;
    }
  };
  
  const getAll = async (req, res) => {
    try {
      const database = getDatabase();
      const projectsRef = ref(database, 'projects');
      const projectsSnapshot = await get(projectsRef);
      const projectsData = [];
  
      projectsSnapshot.forEach((project) => {
        const projectObject = {
          id: project.key,
          ...project.val()
        };
        projectsData.push(projectObject);
      });
  
      return res.json(projectsData);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

   const getProject = async (projectId) => {
    const database = getDatabase();
    const projectRef = ref(database, `projects/${projectId}`);
    const projectSnapshot = await get(projectRef);
  
    if (!projectSnapshot.exists()) {
      return null; // retorna nulo se o projeto não existir
    }
  
    const project = {
      id: projectSnapshot.key,
      ...projectSnapshot.val()
    };
  
    return project;
  };

  const update = async (req, res) => {
    const projectId = req.params.id;
    const database = getDatabase();
    const projectRef = ref(database, `projects/${projectId}`);
    const projectSnapshot = await get(projectRef);
  
    if (!projectSnapshot.exists()) {
      res.status(404).json({ error: 'Projeto não encontrado.' });
      return;
    }
  
    try {
      const { name, link, description, img, tecnologies } = req.body;
      const updatedProject = new Project(name, link, description, img, tecnologies);
      await set(projectRef, updatedProject);
      res.status(200).json({ message: 'Projeto atualizado com sucesso.' }); return
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const deleteProject = async (req, res) => {
    const projectId = req.params.id;
    const database = getDatabase();
    const projectRef = ref(database, `projects/${projectId}`);
    const projectSnapshot = await get(projectRef);
  
    if (!projectSnapshot.exists()) {
      res.status(404).json({ error: 'Projeto não encontrado.' });
      return;
    }
  
    const project = new Project(projectSnapshot.val().name, projectSnapshot.val().link, projectSnapshot.val().description, projectSnapshot.val().img);
  
    await remove(projectRef);
  
    res.status(200).json({ message: 'Projeto removido com sucesso.' });
  };
  
  export default {
    save,
    getAll,
    getProject,
    update,
    deleteProject
  };