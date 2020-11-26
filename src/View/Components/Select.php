<?php


namespace michalkortas\LaravelOptionsCreator\View\Components;


use Illuminate\Support\Str;
use Illuminate\View\Component;

class Select extends Component
{
    /**
     * @var string|null
     */
    public $component;
    /**
     * @var string|null
     */
    public $url;
    /**
     * @var string|null
     */
    public $uuid;
    /**
     * @var string
     */
    public $title;
    /**
     * @var string
     */
    public $saveButtonTitle;
    /**
     * @var string
     */
    public $loadingText;
    /**
     * @var string
     */
    public $successText;
    /**
     * @var string
     */
    public $errorText;
    /**
     * @var string
     */
    public $successTextKey;
    /**
     * @var string
     */
    public $successValueKey;
    /**
     * @var int|int
     */
    private $setNewValue;

    public function __construct(
        string $url = null,
        string $component = '',
        string $title = 'Create new option',
        string $saveButtonTitle = 'Save',
        string $loadingText = 'Please wait',
        string $successText = 'Success!',
        string $errorText = 'Error occurred...',
        string $successTextKey = 'id',
        string $successValueKey = 'name',
        int $setNewValue = 1
    )
    {
        $this->url = $url;
        $this->component = $component;
        $this->uuid = Str::uuid();
        $this->title = $title;
        $this->saveButtonTitle = $saveButtonTitle;
        $this->loadingText = $loadingText;
        $this->successText = $successText;
        $this->errorText = $errorText;
        $this->successTextKey = $successTextKey;
        $this->successValueKey = $successValueKey;
        $this->setNewValue = $setNewValue;
    }

    public function render()
    {
        return view('optionscreator::components.select');
    }
}
