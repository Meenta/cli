var Datastore = require('nedb');
var homedir = require('user-home');

exports.db = new Datastore({
	filename: homedir + '/.meenta.db',
	autoload: true
});

exports.initDB = function (filePath, autoload) {
	this.db = new Datastore({
		filename: filePath,
		autoload: autoload
	});
};

exports.saveActiveUser = function (data, callback) {
	this.db.update({ active: true }, data, { upsert: true }, callback);
};

exports.getSession = function (env, callback) {
	var self = this;
	return new Promise((resolve, reject) => {
		self.db.findOne({ _id: env }, function(err, data) {
			if (err) return reject(err)
			if (!data) {
				reject('No session. Login Rquired');
			} else {
				resolve(data);
			}
		});
	})
};

// exports.getSession = function (callback) {
// 	var self = this;
// 	return new Promise((resolve, reject) => {
// 		self.db.findOne({ key: 'token' }, function(err, data) {
// 			if (err) return reject(err)
// 			if (!data) {
// 				reject('No session. Login Rquired');
// 			} else {
// 				resolve(data);
// 			}
// 		});
// 	})
// };

exports.getSetup = function() {
	// Get the curent environment. Default to produciton is not defined.
	var self = this;

	return new Promise((resolve, reject) => {
		this.db.findOne({ _id: 'current' }, function(err, data) {
			if (err) return reject(err)

			if (!data) {
				resolve({ domain: 'https://api.meenta.io', env: 'production' })
			} else {
				console.log('what', data);
				resolve(data)
			}
		})
  })
}

exports.removeActiveUser = function (callback) {
	this.db.remove({ active: true }, callback);
}

// Method to allow us to change the enviroment for a user.
exports.changeEnvironment = function (data, callback) {
	this.db.update({ _id: 'current' }, data, { upsert: true }, callback);
}

exports.get = function(query) {
	this.db.find(query, function(err, data) {
		if (err) console.log(err)
		console.log('Data', data)
	})
}

// Method to purge all data in the db.
exports.purge = function() {
	this.db.remove({}, { multi: true }, function(err, data) {
		if (err) console.log(err)
		console.log('Db purged')
	})
}

exports.setEnvironmentAuth = function(env, auth, callback) {
	this.db.update({ _id: env }, auth, { upsert: true }, callback);
}

exports.setEnvironment = function(env) {

	var self = this;

	return new Promise((resolve, reject) => {
		var doc = { env: 'current' }
		switch (env) {
			case 'local':
			  doc.desc = 'local'
				doc.api = 'http://localhost:4000/'
				break;
			case 'production':
				doc.desc = 'production'
				doc.api = 'https://api.meenta.io/'
				break;
			default:
				doc.desc = 'custom'
				doc.api = env || 'https://api.meenta.io/'
		}

		self.db.update({ env: 'current' }, doc, { upsert: true }, function(err, data) {
			console.log(doc);
			resolve(doc)
		});
	})

}

exports.getEnvironment = function() {
	var self = this;

	return new Promise((resolve, reject) => {
		self.db.findOne({ _id: 'current' }, function(err, env) {
			self.db.findOne({ _id: env.env }, function(err, auth) {
				resolve({ api: env, auth: auth })
			})
		})
	})

}
