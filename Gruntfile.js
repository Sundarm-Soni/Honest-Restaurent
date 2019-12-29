'use strict'; //means use strict java script code

module.exports = function(grunt){

    require('time-grunt')(grunt);// loading the time grunt node module

    require('jit-grunt')(grunt);// loading grunt plugins or node modules

    grunt.initConfig({
        //every grunt plugin is configured here
        sass:{
            dist:{
                files:{
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {

            files: 'css/*.scss',
            tasks: ['sass']

        },
        browserSync:{

            dev:{
                bsFiles:{

                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },

                options:{

                    watchTask: true,
                    server: {

                        baseDir: './'

                    }

                }


            }


        }

    });
    grunt.registerTask('css',['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};