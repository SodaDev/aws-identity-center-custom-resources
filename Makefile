build:
	sam build --beta-features

deploy: build
	sam deploy \
		--stack-name=sso-users \
		--resolve-s3 \
		--capabilities CAPABILITY_IAM