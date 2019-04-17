/* eslint-disable */

import loopback from '@/services/loopback';

function filterKey(k) {
	return k ? `/${k}` : '';
}

export default {

	model: '',

	setModel(model) {
		this.model = model;
	},

	setId(id) {
		this.id = id;
	},

	find({ id, filter }) {
		id = filterKey(id);
		return loopback.get(`/${this.model}/${id}${this.relation}`, { params: { filter } });
	},

	findById({ id, fk, filter }) {
		fk = filterKey(fk);
		return loopback.get(`/${this.model}/${id}${this.relation}${fk}`, { params: { filter } });
	},

	create({ id, data }) {
		id = filterKey(id);
		return loopback.post(`/${this.model}/${id}${this.relation}`, data);
	},

	patch({ id }, data) {
        return loopback.patch(`/${this.model}/${id}`, data);
    },

	updateById({ id, fk }, data) {
		return loopback.put(`/${this.model}/${id}${this.relation}/${fk}`, data);
	},

	update({ id }, data) {
		return loopback.put(`/${this.model}/${id}${this.relation}`, data);
	},

	destroyById({ id, fk }) {
		fk = filterKey(fk);
		return loopback.delete(`/${this.model}/${id}${this.relation}/${fk}`);
	}
};
