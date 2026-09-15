@php
    $locale = app()->getLocale() ?: 'en';
    $homeUrl = url('/'.$locale);
    $isRtl = $locale === 'ar';
    $status = $status ?? 500;
    $title = $title ?? 'Error';
    $heading = $heading ?? 'Something went wrong';
    $message = $message ?? 'Please try again later.';
    $showImage = $showImage ?? false;
    $loginUrl = null;
    try {
        $loginUrl = route('login');
    } catch (\Throwable $e) {
        $loginUrl = url('/'.$locale.'/login');
    }
@endphp
<!DOCTYPE html>
<html lang="{{ $locale }}" dir="{{ $isRtl ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>{{ $title }} | {{ config('app.name', 'Symfonix') }}</title>
    <link rel="stylesheet" href="{{ asset('theme/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('theme/css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('theme/css/compat.css') }}">
    @if ($isRtl)
        <link rel="stylesheet" href="{{ asset('theme/css/rtl.css') }}">
    @endif
</head>
<body class="top" id="page-top">
    <header class="intro intro-fullscreen" style="background-image: url({{ asset('theme/img/main/55.jpg') }});">
        <div class="overlay"></div>
        <div class="intro-body">
            <h1 class="big light">{{ $status }}</h1>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <h2>{{ $heading }}</h2>
                        <h3>{{ $message }}</h3>
                        <p>
                            @if (! empty($showLogin))
                                <a class="btn btn-gray btn-lg" href="{{ $loginUrl }}">Login</a>
                            @endif
                            <a class="btn btn-dark btn-lg" href="{{ $homeUrl }}">{{ __('Back To Home') }}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</body>
</html>
