.PHONY:all
all:
	@echo "build-local"

.PHONY:build-local
build-local-ios:
	@echo "Building for iOS locally"
	eas build --local --profile preview --platform ios

.PHONY:build-local-android
build-local-android:
	@echo "Building for Android locally"
	eas build --local --profile preview --platform android