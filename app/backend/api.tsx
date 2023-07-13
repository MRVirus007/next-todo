import axios from 'axios';
const url = 'https://64ae6989c85640541d4d025d.mockapi.io/notes/';
//fetch notes from mock api
export const getNotes = async () => {
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const addNote = async (note:any) => {
    const response = await axios.post(url, note, {
        headers: {
          'content-type': 'application/json',
        },
      });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
};
  
export const deleteNote = async (taskId:number) => {
  return await axios.delete(url + taskId).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  });
};