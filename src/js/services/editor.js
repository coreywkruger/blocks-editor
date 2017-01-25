var editorServices = angular.module('editorServices', []);

editorServices.factory('editorService', ['$rootScope', '$q',
  function($rootScope, $q) {
    return new function(){

      this.templates = [{
        title: 'Email One',
        id: '1',
        content: testTemplate
      }, {
        title: 'Email Two',
        id: '2',
        content: testTemplate2
      }];

      this.events = {
        EDITING: 'start-editing',
        CANCEL: 'stop-editing',
        SAVE: 'save-template'
      };
      this.uploading = {status: false};

      this.get = function(id){
        return _.find(this.templates, function(template){
          return template.id === id;
        });
      };

      this.update = function(id, newContent){
        var index =_.findIndex(this.templates, function(template){
          return template.id === id;
        });
        this.templates[index].content = newContent;
      };

      this.create = function(title, content){
        var newTemplate = {
          id: Date.now().toString(),
          title: title,
          content: content
        };
        this.templates.push(newTemplate);
      };

      this.startEdit = function(id){
        $rootScope.$broadcast(this.events.EDITING, this.get(id));
      };

      this.startCancel = function(id){
        $rootScope.$broadcast(this.events.CANCEL, this.get(id));
      };

      this.startSave = function(id){
        $rootScope.$broadcast(this.events.SAVE, this.get(id));
      };

      this.rules = {
        text: {
          toolbar: {
            buttons: ['bold', 'italic', 'underline', 'h2', 'h3'],
          },
          placeholder: {
            text: 'Click to edit'
          }
        },
        image: {
          toolbar: {
            buttons: ['anchor'],
          },
          placeholder: {
            text: 'Click to edit'
          }
        },
        link: {
          toolbar: {
            buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'],
          },
          placeholder: {
            text: 'Click to edit'
          }
        }
      };
    };
  }
]);

var testTemplate = `<div class="region">
  <h2>My Text One</h2>
  <p class="blocks-editable-text">1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<hr>
<div class="region">
  <h2>My Text Two</h2>
  <p>2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<hr>
<div class="region">
  <h2>My Text Three</h2>
  <p>3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>`;

var testTemplate2 = `
<table style="width:100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center">
      <table style="max-width:600px;background-color:#eeeeee;border-collapse: collapse; border-spacing:0;margin:1em auto 5px; padding:0; width:600px" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="text-align:right;"><p style="color:#231f20;margin:0;padding:0;font-size:11px;">View this email <a style="color:#72afb6;text-decoration:underline;" href="http://esserdesign.com/eblast/20160713/">online</a></p></td>
        </tr>
      </table>
      <table style="max-width:600px;background-color:#ffffff;border-collapse: collapse; border-spacing:0;margin:0 auto 1em; padding:0; width:600px" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="top" style="padding:30px;background-color:#c2c2c2;background-image:url(http://esserdesign.com/eblast/20160713/images/header_bg.png); background-repeat: repeat-x; background-position:left bottom">
            <table cellspacing="0" cellpadding="0" border="0" style="width:540px;border-collapse: collapse; border-spacing:0;">
              <tr>
                <td style="width:476px;">
                  <a target="_blank" href="http://esserdesign.com"><img style="margin-top:-15px !important;" src="http://esserdesign.com/eblast/20160713/images/esser_design.png" alt="Esser Design" /></a>
                </td>
                <td>
                  <a target="_blank" href="http://www.linkedin.com/pub/pam-esser/6/49/a54"><img src="http://esserdesign.com/eblast/20160713/images/linkedin.png" alt="LinkedIn" width="22" height="22" /></a>
                  <a target="_blank" href="http://www.facebook.com/pages/Esser-Design/233543286705227" style="margin-right:6px"><img src="http://esserdesign.com/eblast/20160713/images/facebook.png" width="22" height="22" alt="Like us on Facebook" /></a>
                </td>
              </tr>
            </table>      
          </td>
        </tr>
        <tr>
          <td valign="top" class="region" style="padding:30px 30px 20px">
            <a target="_blank" href="http://azbigmedia.com/vote-ranking-arizona" style="text-decoration:none;outline:none;border:none;"><img class="image_fix" src="http://esserdesign.com/eblast/20160713/images/headline.png" alt="Just Click and Vote at RankingArizona.com" /></a>
          </td>
        </tr>
        
        <tr>
          <td valign="top" style="padding:0 30px 30px">
            <table cellspacing="0" cellpadding="0" border="0" style="width:540px;border-collapse: collapse; border-spacing:0;">
              <tr>
                <td class="region">
                  <a target="_blank" href="tel:6022579790"><img style="width:180px;height:30px" src="http://esserdesign.com/eblast/20160713/images/phone.png" alt="602-257-9790" /></a>
                </td>
                <td class="region">
                  <a target="_blank" href="mailto:pamela@esserdesign.com"><img style="width:180px;height:30px" src="http://esserdesign.com/eblast/20160713/images/email.png" alt="pamela@esserdesign.com" /></a>
                </td>
                <td class="region">
                  <a target="_blank" href="http://esserdesign.com"><img style="width:180px;height:30px" src="http://esserdesign.com/eblast/20160713/images/website.png" alt="http://esserdesign.com" /></a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
    
        <tr>
          <td valign="top" style="padding:0 30px 30px">
            <table cellspacing="0" cellpadding="0" border="0" style="width:540px;border-collapse: collapse; border-spacing:0;">
              <tr>
                <td class="region" style="width:260px;" valign="top">
                  <a target="_blank" href="http://esserdesign.com/#!/projects/branding/829" class="blocks-editable-image"><img class="image_fix" src="http://esserdesign.com/eblast/20160713/images/branding.jpg" alt="Branding: Arizona State University" /></a>
                  <h2 style="font-weight:normal;font-size:18px;margin-bottom:8px;line-height:22px" class="blocks-editable-text">Arizona State University</h2>
                  <a target="_blank" href="http://esserdesign.com/#!/projects/branding/829" style="color:#D9531E; font-size:13px; text-decoration:none" class="blocks-editable-link">See More &raquo; </a>
                </td>
                <td style="width:20px;">&nbsp;</td>
                <td class="region" style="width:260px;" valign="top">
                  <a target="_blank" href="http://esserdesign.com/#!/projects/Packaging/776" class="blocks-editable-image"><img class="image_fix" src="http://esserdesign.com/eblast/20160713/images/packaging.jpg" alt="Packaging: Essence Bakery Cafe" /></a>
                  <h2 style="font-weight:normal;font-size:18px;margin-bottom:8px;line-height:22px" class="blocks-editable-text">Essence Bakery Cafe</h2>
                  <a target="_blank" href="http://esserdesign.com/#!/projects/Packaging/776" style="color:#D9531E; font-size:13px; text-decoration:none">See More &raquo;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td valign="top" style="padding:0 30px 30px">
            <table cellspacing="0" cellpadding="0" border="0" style="width:540px;border-collapse: collapse; border-spacing:0;">
              <tr>
                <td class="region" style="width:260px;" valign="top">
                  <a target="_blank" href="http://esserdesign.com/#!/projects/Print/770" class="blocks-editable-image"><img class="image_fix" src="http://esserdesign.com/eblast/20160713/images/print.jpg" alt="Print: City of Phoenix" /></a>
                  <h2 style="font-weight:normal;font-size:18px;margin-bottom:8px;line-height:22px" class="blocks-editable-text">City of Phoenix</h2>
                  <a target="_blank" href="http://esserdesign.com/#!/projects/Print/770" style="color:#D9531E; font-size:13px; text-decoration:none">See More &raquo; </a>
                </td>
                <td style="width:20px;">&nbsp;</td>
                <td class="region" style="width:260px;" valign="top">
                  <a target="_blank" href="http://esserdesign.com/#!/projects/websites/1935" class="blocks-editable-image"><img class="image_fix" src="http://esserdesign.com/eblast/20160713/images/websites.jpg" alt="Websites: LGE Design Build" /></a>
                  <h2 style="font-weight:normal;font-size:18px;margin-bottom:8px;line-height:22px" class="blocks-editable-text">LGE Design Build</h2>
                  <a target="_blank" href="http://esserdesign.com/#!/projects/websites/1935" style="color:#D9531E; font-size:13px; text-decoration:none">See More &raquo;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
  
        <tr>
          <td valign="top" style="padding:30px;background-color:#f5f5f5">
            <img class="image_fix" src="http://esserdesign.com/eblast/20160713/images/contact.png" alt="Contact Esser Design" />
            <h2 style="font-weight:normal;font-size:18px;line-height:24px;">For over 30 years, clients have called on us for our integrated creative approach. We look forward to connecting and helping you <span style="color:#60869f">make your mark.</span></h2>
            <p style="font-size:18px;line-height:24px;margin-bottom:0">2355 E Camelback Rd, Suite 200; Phoenix, AZ 85016</p>
            <p style="font-size:18px;line-height:24px;margin-top:4px;"><strong>Phone</strong> 602-257-9790  <strong>Fax</strong> 602-340-1640</p>
          </td>
        </tr>
        <tr>
          <td valign="top" style="padding:10px 30px;background-color:#c2c2c2">
            <table cellspacing="0" cellpadding="0" border="0" style="width:540px;border-collapse: collapse; border-spacing:0;">
              <tr>
                <td style="width:476px;">
                  <p style="color:#231f20;font-size:10px;margin-bottom:0">&copy; 2016 Esser Design | 2355 E Camelback Rd | Suite 200 | Phoenix, AZ 85016 | 602-257-9790</p>
                  <unsubscribe style="text-decoration:none"><p style="text-decoration:none;color:#231f20;font-size:10px;margin:0">Click here to unsubscribe.</p></unsubscribe>
                </td>
                <td>
                  <a target="_blank" href="http://www.linkedin.com/pub/pam-esser/6/49/a54"><img src="http://esserdesign.com/eblast/20160713/images/linkedin.png" width="22" height="22" alt="LinkedIn" /></a>
                  <a target="_blank" href="http://www.facebook.com/pages/Esser-Design/233543286705227" style="margin-right:6px;"><img src="http://esserdesign.com/eblast/20160713/images/facebook.png" width="22" height="22" alt="Like us on Facebook" /></a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;