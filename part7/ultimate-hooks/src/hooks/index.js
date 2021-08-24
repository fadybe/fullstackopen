import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function initResource() {
      await get();
    }
    initResource();
  }, []);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    const data = response.data;
    setResources([...resources, data]);
  };

  const get = async () => {
    const response = await axios.get(baseUrl);
    const data = response.data;
    setResources(data);
    return data;
  };

  const service = {
    get,
    create,
  };

  return [resources, service];
};
