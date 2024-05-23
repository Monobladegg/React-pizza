import React from 'react'
import { Link } from 'react-router-dom'


function CartEmpty() {
  return (
    <div className='cart cart--empty'>
      <h2>
        Корзина пустая <icon>😢</icon>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.<br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>

      <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp" alt="Empty cart" />
      <Link to="/">
        <button className="button button--black">
          <span>Вернуться назад</span>
        </button>
      </Link>

    </div>
  )
}

export default CartEmpty