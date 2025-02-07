import React, { useState, useEffect, useRef, useMemo } from "react";
import { Counter, CurrencyIcon, Tab as ImportedTab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredientsStyle.module.css';
// ----------------------------------------------------------------------------------------------------------------
function Tab({ current, setCurrent, category }) {
  return (
    <div style={{ display: "flex" }}>
      {category.map((cat) => (
        <ImportedTab 
          key={cat.type} 
          value={cat.type} 
          active={current === cat.type} 
          onClick={() => setCurrent(cat.type)}
        >
          {cat.type === "bun" ? "Булки" : cat.type === "sauce" ? "Соусы" : "Начинки"}
        </ImportedTab>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------------------------------------------------
function Ingredient({ currentCategory, ingredients, category, setCategory, categoryRefs}) {
    //useState 
    const [counts, setCounts] = useState({}); 

    //поиск уникальных типов категорий ингредиентов
    useEffect(() => {
        if (ingredients.length > 0) {
            const uniqueTypes = Array.from(
                new Set(ingredients.map((ingredient) => ingredient.type))
            ).map((type) => ({ type }));
            setCategory(uniqueTypes);
        }
    }, [ingredients]);

    // console.log(category.map((el) => el))

    // cскролл к нужному элементу
    useEffect(() => {
        if (categoryRefs.current[currentCategory]) {
          categoryRefs.current[currentCategory].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
    }, [currentCategory]);

    //получаем отсортированные ингредиенты по категориям
    const categorizedIngredients = useMemo(() => {
        return category.reduce((acc, { type }) => {
            acc[type] = ingredients.filter((ingredient) => ingredient.type === type);
            return acc;
        }, {});
    }, [category, ingredients]);

    // console.log(categorizedIngredients)

    //счетчик нажатий на ингредиент
    
    const handleIngredientClick = (id) => {
        
        setCounts((prevCounts) => ({
          ...prevCounts,
          [id]: (prevCounts[id] || 0) + 1,
        }));
      };

      return (
        <div className={styles.scrollContainer}>
        {Object.keys(categorizedIngredients).map((type) => (
          <div key={type} ref={(el) => (categoryRefs.current[type] = el)}>
                <h3 className="text text_type_main-medium pb-6 pt-10">
                  {category.map((cat) => (
                    cat.type === type ? (
                      cat.type === "bun" ? "Булки" : 
                      cat.type === "sauce" ? "Соусы" : 
                      "Начинки"
                    ) : null
                  ))}
                </h3>
            <div className={styles.mainContainer}>
              {categorizedIngredients[type].map((ingredient) => (
                <div
                  key={ingredient._id}
                  className="pl-4 pr-6 pb-8"
                  style={{ position: "relative" }}
                  onClick={() => handleIngredientClick(ingredient._id)}
                >
                  {counts[ingredient._id] > 0 && <Counter count={counts[ingredient._id]} />}
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="pl-4 pr-4 pb-1"
                    style={{ width: "200px" }}
                  />
                  <p className={`${styles.priceGroup} text text_type_digits-default`} >
                    <CurrencyIcon /> {ingredient.price}
                  </p>
                  <h4 className="text text_type_main-default ">{ingredient.name}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      )
}

// ----------------------------------------------------------------------------------------------------------------
function BurgerIngredients() {  
     //ссылка на получения данных
     const APIHREF = "https://norma.nomoreparties.space/api/ingredients";

     // useState 
     const [ingredients, setIngredients] = useState([]);
     const [category, setCategory] = useState([]);
     const [current, setCurrent] = useState("bun");
     
     const categoryRefs = useRef({});
 
     // получаем данные с сервера
     useEffect(() => {
         fetch(APIHREF)
             .then((response) => {
                 if (!response.ok) {
                     const errorMessage = response.status === 404
                         ? 'Ингредиенты не нашлись'
                         : 'Что-то пошло не так :(';
 
                     throw new Error(errorMessage);
                 }
                 return response.json();
             })
             .then((data) => {
                 setIngredients(data.data)
             })
             .catch((error) => {
                 console.log("Error fetching ingredients:", error.message);
             });
     }, [])
 
     // console.log(ingredients.map((el) => el))
 
    return (
        <div>
            <p className="text text_type_main-large  pb-5 pt-10">Соберите бургер</p>
            <div style={{ maxWidth: "600px" }}>
                <Tab
                current={current}
                setCurrent={setCurrent}
                category={category}
                />

                <Ingredient
                currentCategory={current}
                ingredients={ingredients}
                category={category}
                categoryRefs={categoryRefs}
                setCategory={setCategory}
                />
            </div>
        </div>
    );
  }

export default BurgerIngredients;