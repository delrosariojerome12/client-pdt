import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const LicenseAgreement = () => {
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ paddingBottom: 30 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          SOFTWARE LICENSE AGREEMENT FOR LEE SYSTEMS TECHNOLOGY VENTURES
          INCORPORATED ACCOUNTING SOFTWARE
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "black",
            marginBottom: 5,
          }}
        />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 10,
              fontSize: 16,
            }}
          >
            License Agreement
          </Text>
          <Text
            style={{
              textAlign: "justify",
              padding: 10,
              fontSize: 16,
            }}
          >
            You should carefully read the following terms and conditions before
            using this software. This Lee Systems Technology Ventures
            Incorporated Software License Agreement ("SLA") is a legal agreement
            between you (either an individual or a single entity) and Lee
            Systems Technology Ventures Incorporated for this Software product
            which will be referred to in this agreement as the "SOFTWARE".
            Unless you have a different license agreement signed by Lee Systems
            Technology Ventures, your use of this software indicates your
            acceptance of this license agreement and warranty.{" "}
            <Text style={{ fontWeight: "bold" }}>
              IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, DO NOT USE THE
              SOFTWARE.
            </Text>
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.paraContainer}>
            <Text style={styles.header}>Governing Law</Text>
            <Text style={{ textAlign: "justify", fontSize: 16 }}>
              You should carefully read the following terms and conditions
              before using this software. This Lee Systems Technology Ventures
              Incorporated Software License Agreement ("SLA") is a legal
              agreement between you (either an individual or a single entity)
              and Lee Systems Technology Ventures Incorporated for this Software
              product which will be referred in this agreement as the
              "SOFTWARE". Unless you have a different license agreement signed
              by Lee Systems Technology Ventures, your use of this software
              indicates your acceptance of this license agreement and warranty.
              IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, DO NOT USE THE
              SOFTWARE.
            </Text>
            <Text style={{ textAlign: "justify", fontSize: 16 }}>
              This agreement shall be governed by the laws of the Republic of
              the Philippines.
            </Text>
          </View>

          <View style={styles.paraContainer}>
            <Text style={styles.header}>SOFTWARE PRODUCT LICENSE</Text>
            <Text style={{ textAlign: "justify", fontSize: 16 }}>
              The software product is protected by copyright laws and
              international copyright treaties, as well as other intellectual
              property laws and treaties. The software is licensed, NOT SOLD.
            </Text>
          </View>

          <View style={styles.paraContainer}>
            <Text style={styles.header}>Use and Registration</Text>
            <Text style={{ textAlign: "justify", fontSize: 16 }}>
              This is not a free software. You agree to register this software
              in the website of Lee Systems Technology Ventures
              (www.lstventures.com).
            </Text>
          </View>

          <Text style={styles.header}>1. GRANT OF LICENSE.</Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            Lee Systems Technology Ventures grants you as an individual, a
            personal, non-exclusive license to use the software product. You may
            install and use one copy of the software on a single computer. You
            may also store or install a copy of the Software Product, such as a
            network server or back-up disk, used only for the said purpose. A
            license for the software product may not be shared or used
            concurrently on different computers.
          </Text>

          <Text style={styles.header}>
            2. DESCRIPTION OF OTHER RIGHTS AND LIMITATIONS.
          </Text>

          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            <Text style={styles.listHeader}>• </Text>
            Not for Resale nor Sublease. You may not resell, sublease or
            otherwise transfer for value, the software product.
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            <Text style={styles.listHeader}>• </Text>
            You acknowledge that Lee Systems Technology Ventures Accounting
            Software contains proprietary and confidential information that is
            protected by applicable intellectual property and other laws. Except
            as expressly permitted herein, you agree not to copy, modify, rent,
            lease, loan, sell, distribute or create derivative works based on
            this Software, in whole or in part.
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            <Text style={styles.listHeader}>• </Text>
            You agree not to translate, reverse engineer, decompile, disassemble
            or make derivative works from this software. You agree not to modify
            this Software in any manner or form, or to use modified versions of
            this Software including (without limitation) for the purpose of
            obtaining unauthorized access to the data and unlimited use of this
            program.
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            <Text style={styles.listHeader}>• </Text>
            The software product is licensed as a single product. Its component
            parts may not be separated for use on more than one computer.
          </Text>
          <Text
            style={{ textAlign: "justify", fontSize: 16, marginBottom: 10 }}
          >
            <Text style={styles.listHeader}>• </Text>
            Lee Systems Technology Ventures is not responsible for obtaining and
            maintaining the computer equipment and accessories used by the
            Software.
          </Text>

          <Text style={styles.header}>3. Upgrades or Modifications.</Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            If the software is upgraded or modified, you must be properly
            licensed to use a product identified by Lee Systems Technology
            Ventures as being eligible for the upgrade/modified in order to use
            the software. You may use the resulting upgraded/modified product
            only in accordance with the terms of this SLA. If the software is an
            upgrade/modified of a component of a package of software programs
            that you licensed as a single product, the software may be used and
            transferred only as part of that single product package and may not
            be separated for use on more than one computer.
          </Text>

          <Text style={styles.header}>
            4. COPYRIGHT & INTELLECTUAL PROPERTY.
          </Text>

          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            Republic Act No. 8293. All title and copyrights in and to the
            software products (including but not limited to any images,
            photographs, animations, video, audio, music, text, and "applets"
            incorporated into the software), the accompanying printed materials,
            and any copies of the software are owned by Lee Systems Technology
            Ventures or its suppliers. All title and intellectual property
            rights in and to the content which may be accessed through use of
            the Software Product is the property of the respective content
            owners and may be protected by applicable copyright or other
            intellectual laws and treaties. The software is protected by
            copyright laws and international treaty provisions. Therefore, you
            must treat the software like any other copyrighted material except
            that you may install the software on a single computer provided you
            keep the original solely for backup or archival purposes. You may
            not copy the printed materials accompanying the software.
          </Text>

          <Text style={styles.header}>5. LIMITED WARRANTY</Text>

          <Text
            style={{ textAlign: "justify", fontSize: 16, marginBottom: 30 }}
          >
            The Software is provided "AS IS" and without warranties as to
            performance or merchantability or any other warranties whether
            expressed or implied.
          </Text>

          <View style={styles.paraContainer}>
            <Text style={[styles.header, { textAlign: "center" }]}>
              LEE SYSTEMS TECHNOLOGY VENTURES INCORPORATED ENTIRE LIABILITY TO
              YOU AND YOUR EXCLUSIVE REMEDY SHALL BE THE REPLACEMENT OF ANY
              DEFECTIVE MEDIA(SUCH AS CD-ROM) RETURNED BY YOU TO LEE SYSTEMS
              TECHNOLOGY WITH PROOF OF PURCHASE DURING THE 30-DAY LIMITED
              WARRANTY PERIOD.
            </Text>
            <Text />
            <Text style={[styles.header, { textAlign: "center" }]}>
              NO OTHER WARRANTIES. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE
              LAW, LEE SYSTEMS TECHNOLOGY VENTURES AND ITS REFERRALS DISCLAIM
              ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS OR IMPLIED,
              STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO, WARRANTIES
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
              NON-INFRINGEMENT, WITH REGARD TO THE SOFTWARE PRODUCT, AND THE
              PROVISION OF OR FAILURE TO PROVIDE SUPPORT SERVICES. LEE SYSTEMS
              DISCLAIMS ANY WARRANTY AS TO THE PERFORMANCE OF THE SOFTWARE OR AS
              TO THE RESULTS THAT MAY BE OBTAINED BY USING THE SOFTWARE. THE
              ENTIRE RISK AS TO THE INSTALLATION, QUALITY, USE AND PERFORMANCE
              OF THE SOFTWARE IS WITH YOU. IN NO EVENT SHALL LEE SYSTEMS
              TECHNOLOGY VENTURES OR ITS STAFF, REFERRALS AND REPRESENTATIVES BE
              LIABLE FOR ANY SPECIAL, INCIDENTAL, DIRECT, INDIRECT, OR
              CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION,
              DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS
              OF BUSINESS INFORMATION, OR ANY OTHER PECUNIARY LOSS) ARISING OUT
              OF THE USE OF OR INABILITY TO USE THE SOFTWARE PRODUCT OR THE
              PROVISION OF OR FAILURE TO PROVIDE SUPPORT SERVICES, EVEN IF LEE
              SYSTEMS TECHNOLOGY VENTURES HAS BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES. LEE SYSTEMS TECHNOLOGY GRANTS NO WARRANTY AND SHALL
              HAVE NO LIABILITY WHATSOEVER BEYOND THE 30 DAY PERIOD WARRANTY.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  paraContainer: {
    marginBottom: 10,
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  listHeader: {
    textAlign: "center",
  },
});

export default LicenseAgreement;
