To run the server.

If you haven't created an environment, run:
```
python3 -m venv env
```

Everytime you open a new terminal window, run:
```
source env/bin/activate
```

Once in the environment, run:
```
pip install -r requirements.txt
python3 app.py
```

To install client-side dependencies run:
```
yarn
```

To develop the client-side javascript, run:
```
yarn serve
```
This will watch the javascript files and rebuild them when they change. They will be built to `/assests/dist` and served via flask.

If you have trouble seeing client side changes, you may need to do a hard refresh. This is a rough proof of concept and a minimal amount of time has been spent on tooling and quick onboarding.
