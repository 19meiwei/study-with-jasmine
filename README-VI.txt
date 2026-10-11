STUDY WITH JASMINE — NEURAL MP3 INTEGRATION

This ZIP contains the current English and Vietnamese website code, exact-text MP3 manifests, a shared MP3-only player, and scripts to generate and verify MP3s.

IMPORTANT: The MP3 files are NOT yet generated in this package. Running generate_mp3.py requires Internet access and the edge-tts package. It may fail if the remote service blocks access. Check provider usage terms before commercial publishing.

ON YOUR MAC:
1. Unzip the package in a temporary folder.
2. In Terminal, cd into that extracted folder.
3. python3 -m pip install edge-tts
4. python3 generate_mp3.py
5. python3 verify_audio.py
6. Only after verification succeeds, copy english-speaking/ and vietnamese/ to your website project, replacing their matching folders.
7. git add . && git commit -m "Add neural MP3 audio for English and Vietnamese" && git push origin main

Voice choices: en-US-JennyNeural (American English), vi-VN-HoaiMyNeural (Vietnamese). These are synthetic neural voices, NOT recordings of human native speakers. Human review is required to certify pronunciation quality. The static website never requires the visitor to install a voice or call TTS services; it loads hosted MP3 files.

NOTE: This package covers manifest text gathered from current English vocabulary and grammar examples, speaking models, Vietnamese course lessons, proverbs and culture vocabulary. Any additional dynamic text needs to be added to the manifest and regenerated. Check every play button on the deployed site; automated static checks alone cannot certify 100% functionality.
