import PropTypes from 'prop-types';

export const BurgerConstructorPropTypes = {
    openOrderModal: PropTypes.func.isRequired,
};

export const DraggableIngredientPropTypes = {
    ingredient: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    moveIngredientHandler: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired,
};