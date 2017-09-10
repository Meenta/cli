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

exports.getSession = function (callback) {
	var self = this;
	return new Promise((resolve, reject) => {
		self.db.findOne({ key: 'token' }, function(err, data) {
			if (err) return reject(err)
			if (!data) {
				reject('No session. Login Rquired');
			} else {
				resolve(data);
			}
		});
	})
};

exports.removeActiveUser = function (callback) {
	this.db.remove({ active: true }, callback);
};

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
		self.db.findOne({ env: 'current' }, function(err, data) {
			if (err) return reject(err);
			if (!data) {
				reject(new Error('No Environment Defined.'))
			} else {
				console.log('Using ' + data.desc  + ' (' + data.api + ')');
				resolve(data)
			}
		});
	});

}
