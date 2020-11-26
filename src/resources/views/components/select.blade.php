<div class="row d-flex justify-content-between optionscreator" data-uuid="{{$uuid}}" data-url="{{$url}}">
    <div class="col-12">
        <div class="row">
            <div class="col-9 optionscreator-input-section">
                {{$slot}}
            </div>
            <div class="col d-flex align-items-end">
                <div class="form-group w-100">
                    <button type="button" class="btn btn-primary btn-block optionscreator-add" data-toggle="modal" data-target="#optionscreator_modal_{{$uuid}}"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
        <div class="alert alert-success d-none optionscreator-success" data-uuid="{{$uuid}}"></div>
    </div>

</div>

@push('optionscreator')
    <div class="modal fade optionscreator-modal" id="optionscreator_modal_{{$uuid}}" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="optionscreator_modal_label_{{$uuid}}" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <form action="{{$url}}" method="post" class="optionscreator-form" data-uuid="{{$uuid}}">
                @csrf
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="optionscreator_modal_label_{{$uuid}}">{{$title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        @component($component) @endcomponent

                        <div class="alert alert-danger d-none optionscreator-danger mt-3" data-uuid="{{$uuid}}"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn shadow-sm btn-success optionscreator-save" data-uuid="{{$uuid}}"><i class="fas fa-save"></i> {{$saveButtonTitle}}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endpush

@once
    @push('scripts')
        <script src="{{asset('optionscreator/js/optionscreator.js')}}"></script>
        <script>
            window.addEventListener('load', function () {
                let config = {
                    uuid: '{!! $uuid !!}',
                    saveButtonTitle: '{!! $saveButtonTitle !!}',
                    loadingText: '{!! $loadingText !!}',
                    url: '{!! $url !!}',
                    successText: '{!! $successText !!}',
                    errorText: '{!! $errorText !!}',
                    successValueKey: '{!! $successValueKey !!}',
                    successTextKey: '{!! $successTextKey !!}',
                    setNewValue: '{!! $setNewValue !!}',
                }
                initOptionsCreator(config)
            });
        </script>
    @endpush
@endonce

