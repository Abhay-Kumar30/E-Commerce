import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "../context/helper";
import toast from "react-hot-toast";
export default function useCategory() {

  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
           const { data } = await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
           setCategories(data?.category);
        } catch (error) { toast.error(error) }
  };
  useEffect(() => { getCategories(); }, []);
  return categories;
}


// we creat ea custom hook to fetch all types of category

