/**
 * vuex的actions模块
 * 通过mutation间接更新state的多个方法的对象
 */

import {
	reqAddress,reqFoodCategorys, reqShops, reqUserInfo, reqLogout,reqShopGoods,
	reqShopRatings, reqShopInfo,clearCart
} from '../api'

import { 
	RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, 
	RECEIVE_USERINFO, RESET_USERINFO,RECEIVE_GOODS,
	RECEIVE_INFO,RECEIVE_RATINGS,INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT, CLEAR_CART
} from './mutation-types'

export default{
	//异步获取地址
	async getAddress({commit, state}){
		//发送异步ajax请求
		const geohash = state.latitude + ',' + state.longitude
		const result = await reqAddress(geohash)
		//提交一个mutation
		if(result.code === 0){
			const address = result.data
			commit(RECEIVE_ADDRESS, {address})
		}
		 
	},

	//异步获取分类列表
	async getCategorys({commit}) {
		const result = await reqFoodCategorys()
		commit(RECEIVE_CATEGORYS, {categorys: result.data})
	},

		// 异步获取商家列表
		async getShops({commit, state}) {
			// 发送异步ajax请求
			const {longitude, latitude} = state
			const result = await reqShops({longitude, latitude})
			// 提交一个mutation
			if (result.code === 0) {
				const shops = result.data
				commit(RECEIVE_SHOPS, {shops})
			}
		},
		//同步记录用户信息
		recordUser({commit}, userInfo){
			commit(RECEIVE_USERINFO,{userInfo})
		},

		//异步获取用户信息
		async getUserInfo({commit}){
			const result = await reqUserInfo();
			if(result.code === 0){
				const userInfo = result.data;
				commit(RECEIVE_USER_INFO, {userInfo})
			}
		},

		//异步登出
		async logout({commit}){
			const result = await reqLogout();
			if(result.code === 0){
				commit(RESET_USERINFO)
			}
		},

		// 异步获取商家信息
	async getShopInfo({commit}) {
		const result = await reqShopInfo()
		if(result.code===0) {
			const info = result.data
			commit(RECEIVE_INFO, {info})
		}
	},
	// 异步获取商家评价列表
	async getShopRatings({commit},callback) {
		const result = await reqShopRatings()
		if(result.code===0) {
			const ratings = result.data
			commit(RECEIVE_RATINGS, {ratings})
			callback && callback()
		}
	},
// 异步获取商家商品列表
	async getShopGoods({commit}, callback) {
		const result = await reqShopGoods()
		if(result.code===0) {
			const goods = result.data
			commit(RECEIVE_GOODS, {goods})

			// 数据更新了，通知一下组件
			callback && callback()
		}
	},

	updateFoodCount({commit}, {food,isAdd}){
		if(isAdd){
			commit(INCREMENT_FOOD_COUNT,{food})
		}else{
			commit(DECREMENT_FOOD_COUNT,{food})
		}
	},
	clearCart({commit}){
		commit(CLEAR_CART)
	}
	
}