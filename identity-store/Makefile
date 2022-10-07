build:
	sam build --beta-features

deploy: build
	sam deploy \
		--stack-name=sso-users \
		--region=us-east-1 \
		--resolve-s3 \
		--profile=temp-admin \
		--capabilities CAPABILITY_IAM