<?php


namespace michalkortas\LaravelOptionsCreator;


use Illuminate\Support\ServiceProvider;
use michalkortas\LaravelOptionsCreator\View\Components\Select;

class LaravelOptionsCreatorServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'optionscreator');

        $this->publishes([
            __DIR__.'/resources/assets' => public_path('optionscreator'),
        ], 'optionscreator');

        $this->loadViewComponentsAs('optionscreator', [
            Select::class,
        ]);
    }

    public function register()
    {
        //
    }
}
