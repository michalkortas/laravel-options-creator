# laravel-options-creator
Wrapper that helps create options at select element dynamically

# Installation

<strong>Warning! This component use Bootstrap Modal!</strong>

``` 
composer require michalkortas/laravel-options-creator
```
```
php artisan vendor:publish --tag=opc --force
```


# Usage

Add new stacks before end of <body> tag.

```
<body>
  ...
  @stack('scripts')
  @stack('optionscreator')
</body>
```

Wrap your select with new tag.
You can use some parameters to configure modal.

```
  <x-optionscreator-select
      url="{{route('store.api.route')}}"
      component="components.subEditForm"
      successValueKey="id"
      successTextKey="name"
      title="New option"
      saveButtonTitle="Create new option"
      loadingText="Please wait..."
      successText="<strong>New option has beed added</strong> to your select tag."
      errorText="<strong>Error occurred</strong>. Check console log.">

      <select name="mySelect">
        <option>Select value</option>
      </select>
  </x-optionscreator-select>
```

This component will do the rest.
