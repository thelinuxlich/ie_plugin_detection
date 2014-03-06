function detectPlugins() {
    var version = "",
        control,
        definedRealPlayerControls = [
            'rmocx.RealPlayer G2 Control',
            'rmocx.RealPlayer G2 Control.1',
            'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
            'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
            'RealPlayer'
        ],
        detectActiveX = function(name) {
            var control;
            try {
                // AcroPDF.PDF is used by version 7 and later
                control = new ActiveXObject(name);
            } catch (e) {
                // Do nothing
            }
            return control;
        };

    if (window.ActiveXObject) {

        // We won't try to detect the Java plugin because it requires manual execution of an applet

        control = detectActiveX('PDF.PdfCtrl') || detectActiveX('AcroPDF.PDF');
        if (control) {
            version = control.GetVersions().split(',');
            version = version[0].split('=');
            version = parseFloat(version[1]);
            console.log("Adobe Reader " + version);
        }

        control = detectActiveX('ShockwaveFlash.ShockwaveFlash');
        if(control) {
            version = control.GetVariable('$version').substring(4);
            version = version.split(',');
            version = parseFloat(version[0] + '.' + version[1]);
            console.log("Flash Player " + version);
        }

        if(typeof QuickTime !== "undefined") {
            // we don't try to detect the version because it requires manual permission
            console.log("Quicktime Player");
        }

        for (var i = 0; i < definedRealPlayerControls.length; i++) {
            control = detectActiveX(definedRealPlayerControls[i]);
            if(control) {
                version = parseFloat(control.GetVersionInfo());
                console.log("RealPlayer " + version);
            }
        }

        control = detectActiveX('SWCtl.SWCtl');
        if(control) {
            version = control.ShockwaveVersion('').split('r');
            version = parseFloat(version[0]);
            console.log("Shockwave Player " + version);
        }

        control = detectActiveX('WMPlayer.OCX');
        if(control) {
            version = parseFloat(control.versionInfo);
            console.log("Windows Media Player " + version);
        }
    }
};

detectPlugins();