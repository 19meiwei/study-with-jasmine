JASMINE AUDIO - DIAGNOSTICS

The uploaded generation-errors.json shows 864 of 864 calls rejected with HTTP 403.
This package DOES NOT contain MP3s and does not repair the website buttons.

Put these three files at the project root next to index.html, keeping existing english-speaking/ and vietnamese/ folders.
In VS Code Terminal:
 python3 -m pip install --upgrade edge-tts
 python3 generate_mp3.py
 python3 verify_audio.py

If 403 persists, use a licensed authenticated TTS service (e.g. Azure Speech) to generate MP3s. Do not commit API keys to GitHub.
Only publish when files are generated, links checked, and playback tested.
