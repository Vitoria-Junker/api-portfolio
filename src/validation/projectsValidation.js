import * as yup from 'yup';

const projectSchema = yup.object().shape({
    name: yup.string().required().min(5),
    link: yup.string().url().required(),
    description: yup.string().required().min(5),
    img: yup.string().url().required(),
    tecnologies: yup.string().required().min(5),
});

export default projectSchema