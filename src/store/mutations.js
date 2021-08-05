/**
 * 直接更新state的多个方法的对象
 */
import { startOfToday } from 'date-fns'
import Vue from 'vue'

import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USERINFO,
	RESET_USERINFO,
	RECEIVE_GOODS,
	RECEIVE_RATINGS,
	RECEIVE_INFO,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CART
}from './mutation-types'

export default{
	[RECEIVE_ADDRESS](state, {address}){
		state.address = address
	},
	[RECEIVE_CATEGORYS](state, {categorys}){
		state.categorys = categorys
	},
	[RECEIVE_SHOPS](state, {shops}){
		state.shops = shops
	},
	[RECEIVE_USERINFO](state, {userInfo}){
		state.userInfo = userInfo
	},
	[RESET_USERINFO](state){
		state.userInfo = {}
	},
	[RECEIVE_INFO](state,{info}){
		state.info = info
	},
	[RECEIVE_RATINGS](state,{ratings}){
		state.ratings = ratings
	},
	[RECEIVE_GOODS](state,{goods}){
		state.goods = goods
	},

	[INCREMENT_FOOD_COUNT](state,{food}){
		if(!food.count){
			Vue.set(food,'count',1);
			//将food添加到cartFoods中
			state.shopCart.push(food)
		}else{
			food.count++
		}
	},
	[DECREMENT_FOOD_COUNT](state,{food}){
		if(food.count){
				food.count--
			if(food.count === 0){
				state.shopCart.splice(state.shopCart.indexOf(food),1)
			}
		}
	},
	[CLEAR_CART](state){
		state.shopCart.forEach(food=>food.count = 0)

		startOfToday.shopCart =[]
	}
}