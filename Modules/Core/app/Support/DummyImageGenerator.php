<?php

namespace Modules\Core\Support;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class DummyImageGenerator
{
    /**
     * Curated Unsplash photos themed for a media / creative production company.
     *
     * @var array<string, list<string>>
     */
    private const STOCK = [
        'studio' => [
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
            'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
            'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
        ],
        'video' => [
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d',
            'https://images.unsplash.com/photo-1485846234645-a62644f84728',
            'https://images.unsplash.com/photo-1572044162444-ad51f25f5a46',
            'https://images.unsplash.com/photo-1536240478700-b869070f9279',
        ],
        'photo' => [
            'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
            'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
            'https://images.unsplash.com/photo-1554048612-b6a482bc67e5',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        ],
        'events' => [
            'https://images.unsplash.com/photo-1459749411177-047147866c5c',
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
        ],
        'branding' => [
            'https://images.unsplash.com/photo-1561070791-2526d30994b5',
            'https://images.unsplash.com/photo-1558655146-d09347e92766',
            'https://images.unsplash.com/photo-1626785774573-4b7993143464',
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        ],
        'blogs' => [
            'https://images.unsplash.com/photo-1485846234645-a62644f84728',
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
            'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
        ],
        'pages' => [
            'https://images.unsplash.com/photo-1497366216548-37526070297c',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
            'https://images.unsplash.com/photo-1556761175-b413da4baf72',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
        ],
        'services' => [
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d',
            'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
            'https://images.unsplash.com/photo-1459749411177-047147866c5c',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
            'https://images.unsplash.com/photo-1572044162444-ad51f25f5a46',
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        ],
        'service_categories' => [
            'https://images.unsplash.com/photo-1536240478700-b869070f9279',
            'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
            'https://images.unsplash.com/photo-1558655146-d09347e92766',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
        ],
        'products' => [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
            'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
            'https://images.unsplash.com/photo-1572044162444-ad51f25f5a46',
            'https://images.unsplash.com/photo-1626785774573-4b7993143464',
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        ],
        'project-use-cases' => [
            'https://images.unsplash.com/photo-1485846234645-a62644f84728',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
            'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        ],
        'avatars' => [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        ],
        'teams' => [
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a',
            'https://images.unsplash.com/photo-1580489944761-15a19d654956',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        ],
    ];

    /**
     * Soft cinematic palette used when stock downloads are unavailable.
     *
     * @var list<array{0: int, 1: int, 2: int}>
     */
    private const PALETTE = [
        [30, 41, 59],
        [15, 118, 110],
        [180, 83, 9],
        [127, 29, 29],
        [67, 56, 202],
        [3, 105, 161],
        [157, 23, 77],
        [22, 101, 52],
        [55, 48, 163],
        [146, 64, 14],
    ];

    private int $colorIndex = 0;

    /** @var array<string, int> */
    private array $themeIndexes = [];

    /**
     * Create a media-themed JPEG and store it on the public disk.
     */
    public function store(string $directory, string $label, int $width = 800, int $height = 600, ?string $theme = null): string
    {
        $directory = trim($directory, '/');
        $theme ??= $this->inferTheme($directory);
        $filename = Str::slug(Str::limit($label, 40, '')).'-'.Str::lower(Str::random(8)).'.jpg';
        $path = $directory.'/'.$filename;

        $binary = $this->fetchStockPhoto($theme, $width, $height)
            ?? $this->renderJpeg($label, $width, $height);

        Storage::disk('public')->put($path, $binary);

        return $path;
    }

    /**
     * Square portrait-style image for people.
     */
    public function storeAvatar(string $label, string $directory = 'avatars'): string
    {
        return $this->store($directory, $label, 400, 400, 'avatars');
    }

    private function inferTheme(string $directory): string
    {
        $key = Str::of($directory)->afterLast('/')->toString();

        return array_key_exists($key, self::STOCK) ? $key : 'studio';
    }

    private function fetchStockPhoto(string $theme, int $width, int $height): ?string
    {
        $pool = self::STOCK[$theme] ?? self::STOCK['studio'];
        $index = $this->themeIndexes[$theme] ?? 0;
        $this->themeIndexes[$theme] = $index + 1;

        $baseUrl = $pool[$index % count($pool)];
        $url = $baseUrl.(str_contains($baseUrl, '?') ? '&' : '?')
            ."auto=format&fit=crop&w={$width}&h={$height}&q=80";

        try {
            $response = Http::timeout(20)
                ->withHeaders([
                    'User-Agent' => 'SymfonixMediaDummySeeder/1.0',
                    'Accept' => 'image/jpeg,image/*,*/*',
                ])
                ->get($url);

            if (! $response->successful()) {
                return null;
            }

            $contentType = (string) $response->header('Content-Type');
            $body = $response->body();

            if ($body === '' || (! str_starts_with($contentType, 'image/') && ! $this->looksLikeJpeg($body))) {
                return null;
            }

            return $body;
        } catch (Throwable) {
            return null;
        }
    }

    private function looksLikeJpeg(string $binary): bool
    {
        return str_starts_with($binary, "\xFF\xD8\xFF");
    }

    private function renderJpeg(string $label, int $width, int $height): string
    {
        $image = imagecreatetruecolor($width, $height);

        [$r, $g, $b] = self::PALETTE[$this->colorIndex % count(self::PALETTE)];
        $this->colorIndex++;

        $background = imagecolorallocate($image, $r, $g, $b);
        $overlay = imagecolorallocatealpha($image, 255, 255, 255, 100);
        $textColor = imagecolorallocate($image, 255, 255, 255);

        imagefilledrectangle($image, 0, 0, $width, $height, $background);
        imagefilledellipse($image, (int) ($width * 0.75), (int) ($height * 0.25), (int) ($width * 0.5), (int) ($height * 0.5), $overlay);
        imagefilledrectangle($image, 0, (int) ($height * 0.72), $width, $height, $overlay);

        $text = Str::limit($label, 42, '…');
        $font = 5;
        $textWidth = imagefontwidth($font) * strlen($text);
        $x = max(16, (int) (($width - $textWidth) / 2));
        $y = (int) ($height * 0.82);

        imagestring($image, $font, $x, $y, $text, $textColor);

        ob_start();
        imagejpeg($image, null, 85);
        $binary = (string) ob_get_clean();
        imagedestroy($image);

        return $binary;
    }
}
