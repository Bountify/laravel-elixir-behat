var elixir   = require('laravel-elixir'),
	gulp     = require('gulp'),
	behat    = require('gulp-behat'),
	notify   = require('gulp-notify'),
	_        = require('underscore');

/*
 |----------------------------------------------------------------
 | Behat Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire Behat test suite and
 | will show notifications indicating the success or failure
 | of that test suite. It works great with the tdd task.
 |
 */

elixir.extend('behat', function(baseDir, options, watchList) {

	baseDir = baseDir || 'tests/features';
	options = _.extend( { notify: true } , options);

	// default watch files
	var tddList = [
		baseDir + '/**/*.feature',
		baseDir + '/**/*Context.php'
	];

	// merge in users watch files (and remove duplicates if they exist)
	tddList = _.union(tddList, watchList);

	new elixir.Task('behat', function() {
		gulp.src('behat.yml')
			.pipe(behat('', options))
			.on('error', notify.onError({
				title: 'Tests Failed',
				message: 'Your Behat tests failed!',
				icon: __dirname + '/../laravel-elixir/icons/fail.png'
			}))
			.pipe(notify({
				title: 'Tests Passed',
				message: 'Your Behat tests passed!',
				icon: __dirname + '/../laravel-elixir/icons/pass.png'
			}));
	}).watch(tddList, 'tdd');

});

